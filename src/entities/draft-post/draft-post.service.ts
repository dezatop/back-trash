import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CompanyService } from '@/entities/company/company.service';
import { DraftPostCreate } from '@/entities/draft-post/dto/draftPostCreate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostDraft } from '@/entities/draft-post/draft-post.entity';
import { PostService } from '@/entities/post/post.service';
import { Company } from '@/entities/company/company.entity';

@Injectable()
export class DraftPostService {
  constructor(
    private readonly companyService: CompanyService,
    private readonly postService: PostService,
    @InjectRepository(PostDraft)
    private readonly draftPostRepository: Repository<PostDraft>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}
  public async createPostDraft(postDto: DraftPostCreate, userId: number) {
    const checkCompany = await this.companyService.searchCompanyUser(
      postDto.company_id,
      userId,
    );

    if (!checkCompany) {
      throw new HttpException('incorrect id company', HttpStatus.BAD_REQUEST);
    }

    const idCompany = postDto.company_id;
    const data = { ...postDto, company: { id: idCompany } };
    const post = await this.draftPostRepository.create(data);
    await this.draftPostRepository.save(post);
    return { status: true };
  }

  private async getDraftPost(id: number) {
    const post = await this.draftPostRepository.findOne({
      where: { id },
      select: {
        company: {
          id: true,
        },
      },
      relations: ['company'],
    });

    if (!post) {
      throw new HttpException('Not Found post', HttpStatus.BAD_REQUEST);
    }

    return post;
  }

  public async addInActivePost(id: number) {
    const draftPost = await this.getDraftPost(id);
    delete draftPost.id;
    await this.postService.addPost(draftPost);
    await this.draftPostRepository.delete(id);

    return { status: true };
  }
}
