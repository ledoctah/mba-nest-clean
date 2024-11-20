import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common';
import { z } from 'zod';

import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer.use-case';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';

import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

const editAnswerBodySchema = z.object({
  content: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(editAnswerBodySchema);

type EditAnswerBodySchema = z.infer<typeof editAnswerBodySchema>;

@Controller('/answers/:id')
export class EditAnswerController {
  constructor(private editAnswer: EditAnswerUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('id') answerId: string,
    @Body(bodyValidationPipe) body: EditAnswerBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { content } = body;
    const userId = user.sub;

    const result = await this.editAnswer.execute({
      content,
      authorId: userId,
      answerId,
      attachmentsIds: [],
    });

    if (result.isLeft()) {
      console.log(result.value);
      throw new BadRequestException();
    }
  }
}
