import { Injectable } from '@nestjs/common';

import { Either, right } from '@/core/either';

import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author';
import { QuestionCommentsRepository } from '../repositories/question-comments-repository';

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string;
  page: number;
}

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    questionComments: CommentWithAuthor[];
  }
>;

@Injectable()
export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionIdWithAuthor(
        questionId,
        {
          page,
        },
      );

    return right({
      questionComments,
    });
  }
}
