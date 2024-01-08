import api from '../../../../lib/config/api'
import { errorHandler } from '../../../../lib/utils/errorHandler'
import { type PostServiceResponse } from '../../../../shared/types/service/PostServiceResponse'
import { type BookFormValues, type BookModel } from '../../types/model/book'

export async function createBookService(values: BookFormValues): PostServiceResponse<BookModel> {
  try {
    const { data } = await api.post('/books', values)

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
