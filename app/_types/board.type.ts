export interface PostType {
  id: number;
  title: string;
  body: string;
  add_file: string | null;
  file_url: string | null;
  user_id: string;
}

export interface PostAddType extends Omit<PostType, 'add_file'> {
  add_file: FileList | string | null;
}
export interface PostUpdateType extends Omit<PostType, 'add_file'> {
  add_file: FileList | string | null;
}

export interface ResponsePostList {
  list: PostType[]; // 게시물 리스트
  total_cnt: number; // 전체 게시물 수
}
export interface ResponseUpload {
  url: string;
}
// // Post 타입 정의
// interface Post {
//   title: string;
//   body: string;
//   add_file: string;
//   file_url: string;
// }

export interface GetPostParams {
  pageParam: number;
}
