import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { IStorage } from './storage';
import { Injectable } from '@nestjs/common';
import { FileDto } from '../auth/dto/file.dto';

@Injectable()
export class SupabaseStorage implements IStorage {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
    );
  }

  async upload(file: FileDto, folder: string): Promise<any> {
    const { data, error } = await this.client.storage
      .from(process.env.SUPABASE_BUCKET)
      .upload(`${folder}/${file.originalname}`, file.buffer, {
        upsert: true,
      });
    if (error) {
      throw error;
    }
    return data;
  }
}
