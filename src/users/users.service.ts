import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { SupabaseClient } from '@supabase/supabase-js';
@Injectable()
export class UsersService {
  constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient) {}

  async create(createUserDto: CreateUserDto) {
    
    const { data, error } = await this.supabase.from('users').insert({
      email: createUserDto.email,
      password: createUserDto.password
    }).select().maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async findOne(email: string) {
    const { data, error } = await this.supabase.from('users').select('*').eq('email', email).maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
