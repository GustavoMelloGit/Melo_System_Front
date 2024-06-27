import api from '../../../../lib/config/api'
import { errorHandler } from '../../../../lib/utils/errorHandler'
import { PostServiceResponse } from '../../../../shared/types/service/PostServiceResponse'
import { BookModel } from '../../types/model/book'
import { CreateBookInputDto } from './BookService.dto'

export class BookService {
  static async createBook(dto: CreateBookInputDto): PostServiceResponse<BookModel> {
    try {
      const { data } = await api.post('/books', dto)

      return {
        data,
        error: null,
      }
    } catch (e) {
      return {
        error: errorHandler(e),
        data: null,
      }
    }
  }
}
