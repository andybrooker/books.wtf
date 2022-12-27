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

      const { data: book, error } = await supabase.from('book_list').select('*').eq('title', "Iliad").limit(1).single()

      if (error) {
        return res.status(500).json({message: error})
      }

      return res.status(200).json(book)

  }
}
