package com.main19.server.postings.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.main19.server.comment.dto.CommentDto;
import com.main19.server.postings.entity.PostingLike;
import com.main19.server.postings.tags.dto.PostingTagsResponseDto;
import com.main19.server.postings.tags.dto.TagResponseDto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
public class PostingResponseDto {
	private long postingId;
	private long memberId;
	private String userName;
	private String profileImage;
	private String postingContent;
	private List<MediaResponseDto> postingMedias;
	private LocalDateTime createdAt;
	private LocalDateTime modifiedAt;
	private List<PostingTagsResponseDto> tags;
	private long likeCount;
	private List<PostingLikeGetResponseDto> postingLikes;
	private List<CommentDto.Response> comments;
}
