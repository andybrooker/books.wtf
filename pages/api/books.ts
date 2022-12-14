// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PostgrestError, PostgrestResponse } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getBooks } from '../../utils/getBooks'
import { getInitialBooks } from '../../utils/getInitialBooks'
import { supabase } from '../../utils/supabaseClient'


type ErrorResponse = {
  message: PostgrestError
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any[] | ErrorResponse >
) {

  switch (req.method) {
    case 'GET':

      const { start, page_size, sort } = req.query


      const range_start = Number(start) * Number(page_size)
      const range_end = range_start + Number(page_size) - 1
      const sort_by = sort ? Number(sort) : 2

      const { data , error } = await getBooks(range_start, range_end, sort_by)

      if (error) {
        return res.status(500).json({message: error})
      }

      return res.status(200).json(data)

  }
}
