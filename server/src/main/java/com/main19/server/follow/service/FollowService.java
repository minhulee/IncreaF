package com.main19.server.follow.service;

import com.main19.server.exception.BusinessLogicException;
import com.main19.server.exception.ExceptionCode;
import com.main19.server.follow.entity.Follow;
import com.main19.server.follow.repository.FollowRepository;
import com.main19.server.member.entity.Member;
import com.main19.server.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FollowService {
    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;

    public Follow createFollow(long followingMemberId, long followedMemberId) {
        if (followedMemberId == followingMemberId) {
            throw new BusinessLogicException(ExceptionCode.SAME_MEMBER);
        }

        Follow follow = new Follow();
        follow.setFollowingId(findFollowMember(followingMemberId));
        follow.setFollowedId(findFollowMember(followedMemberId));

        return followRepository.save(follow);
    }

    public void deleteFollowing(long followingMemberId, long followedMemberId) {
        Follow follow = findExistFollow(followingMemberId, followedMemberId);
        followRepository.delete(follow);
    }



    private Member findFollowMember(long followId) {
        Optional<Member> optionalFollow = memberRepository.findById(followId);
        Member member = optionalFollow.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return member;
    }


    private Follow findExistFollow(long followingMemberId, long followedMemberId) {
        Optional<Follow> optionalFollow = followRepository.findFollowId(followingMemberId, followedMemberId);
        Follow follow = optionalFollow.orElseThrow(() -> new BusinessLogicException(ExceptionCode.FOLLOW_NOT_FOUND));
        return follow;
    }
}
