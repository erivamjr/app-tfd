export type FileDto = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
};

export type AvatarDto = {
  idUser: string;
  file: FileDto;
};
