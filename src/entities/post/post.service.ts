import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '@/entities/post/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  public async addPost(dtoPost) {
    const post = this.postRepository.create(dtoPost);
    await this.postRepository.save(post);
    return dtoPost;
  }
}
