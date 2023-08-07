include .env

restart: down up

up: # create and start containers
	@docker-compose -f docker-compose.yml up -d

down: # stop and destroy containers
	@docker-compose -f docker-compose.yml down

down-volume: #  WARNING: stop and destroy containers with volumes
	@docker-compose -f docker-compose.yml down -v