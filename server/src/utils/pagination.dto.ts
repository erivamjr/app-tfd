// pagination.dto.ts
import { IsInt, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  page: number = 1;

  @IsOptional()
  @IsInt()
  limit: number = 10;

  @IsOptional()
  orderBy: 'createdAt' | 'status' = 'createdAt';

  @IsOptional()
  orderDirection: 'asc' | 'desc' = 'asc';
}
