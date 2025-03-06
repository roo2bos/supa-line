export interface snippetType {
  channelId: string;
  channelTitle: string;
  description: string;
  playlistId: string;
  position: number;
  publishedAt: string;
  resourceId: { kind: string; videoId: string };
  thumbnails: {
    default: { height: number; url: string; width: number };
    high: { height: number; url: string; width: number };
    medium: { height: number; url: string; width: number };
  };
  title: string;
  videoOwnerChannelId: string;
  videoOwnerChannelTitle: string;
}

export interface YouTubeVideo {
  kind: string; // 예: "youtube#video"
  etag: string;
  id: { videoId: string }; // 비디오 ID
  snippet: snippetType;
  contentDetails: YouTubeContentDetails;
  statistics: YouTubeStatistics;
}

export interface YouTubeSnippet {
  publishedAt: string; // ISO 8601 포맷의 날짜
  channelId: string; // 채널 ID
  title: string; // 비디오 제목
  description: string; // 비디오 설명
  thumbnails: YouTubeThumbnails; // 썸네일 이미지
  channelTitle: string; // 채널 제목
  categoryId: string; // 카테고리 ID
  liveBroadcastContent: string; // 예: "none", "live"
  localized: YouTubeLocalized; // 로컬라이즈된 정보
  defaultAudioLanguage: string; // 기본 오디오 언어
}

export interface YouTubeThumbnails {
  default: Thumbnail; // 기본 썸네일
  medium: Thumbnail; // 중간 썸네일
  high: Thumbnail; // 고화질 썸네일
  standard: Thumbnail; // 표준 썸네일
  maxres: Thumbnail; // 최대 해상도 썸네일
}

export interface Thumbnail {
  url: string; // 썸네일 URL
  width: number; // 너비
  height: number; // 높이
}

export interface YouTubeLocalized {
  title: string; // 로컬라이즈된 제목
  description: string; // 로컬라이즈된 설명
}

export interface YouTubeContentDetails {
  duration: string; // 비디오 길이 (ISO 8601 포맷)
  dimension: string; // 예: "2d"
  definition: string; // 예: "hd"
  caption: string; // 자막 여부
  licensedContent: boolean; // 라이센스 콘텐츠 여부
  contentRating: object; // 콘텐츠 등급 (필드가 비어있음)
  projection: string; // 예: "rectangular"
}

export interface YouTubeStatistics {
  viewCount: string; // 조회수
  likeCount: string; // 좋아요 수
  favoriteCount: string; // 즐겨찾기 수
  commentCount: string; // 댓글 수
}
