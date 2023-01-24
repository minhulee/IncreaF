import axios from "axios";
import { AiOutlineHeart, AiFillHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BsBookmarkPlus } from "react-icons/bs";
import styled from "styled-components";
import Cookie from "../../util/Cookie";

const StyledInteraction = styled.div`
    background-color: white;
    padding: 5px;

    p {
        margin: 0;
    }

    .interact {
        width: 100%;
        margin: 10px 0px;
    }

    div svg {
        margin-right: 15px;
    }

    p:nth-child(2) {
        font-weight: 600;
        font-size: 16px;
        margin-bottom: 10px;
        color: #222426;
    }

    .content {
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
        word-wrap: break-word;
        display: -webkit-box;
       -webkit-line-clamp: 3 ;
        -webkit-box-orient: vertical;
    }

    .tags {
        margin: 10px 0px 10px 0px;
        color: #007AC9;
        cursor: pointer;

        span {
            margin-right: 5px;
        }
    }

    > span:last-child {
        color: gray;
        cursor: pointer;
        font-size: 14px;
        letter-spacing: 1px;
    }
`;

const FeedInteraction = ({ setModal, type=null, post, handleCurPost, setPostId, handleChange }) => {
    const cookie = new Cookie();

    const handleLike = () => {
        axios({
            method: "post",
            url: `http://13.124.33.113:8080/posts/${post.postingId}/likes`,
            headers: { Authorization: cookie.get("authorization") },
            data : {
                "memberId" : cookie.get("memberId")
            }
        }).then(res => {
            handleChange();
        }).catch(e => {
        })
    }

    const handleUnlike = (like) => {
        axios({
            method: "delete",
            url: `http://13.124.33.113:8080/posts/likes/${like}`,
            headers: { Authorization: cookie.get("authorization") },
        }).then(res => {
            handleChange();
        }).catch(e => {
        })
    }
 

    return (
        <StyledInteraction>
            <div className="interact">
                {  post.postingLikes.filter((like) => like.memberId === Number(cookie.get("memberId"))).length > 0 ? 
                    <AiFillHeart onClick={() => handleUnlike(post.postingLikes.filter((like) => like.memberId === Number(cookie.get("memberId")))[0].postingLikeId)} />
                    : <AiOutlineHeart onClick={handleLike} />
                }
                <AiOutlineShareAlt />
                <BsBookmarkPlus />
            </div>
            <p>좋아요 {post.likeCount}개</p>
            {   type === null ? <div className="content">{post.postingContent}</div>
                : <div>{post.postingContent}</div>
            }
            <div className="tags">
                { post.tags ? 
                    post.tags.map((tag, idx) => {
                        return <span key={idx}>#{tag.tagName}</span> 
                    })
                    : null
                }
            </div>
            { type ? null
            : <span onClick={() => {
                handleCurPost(post);
                setPostId(post.postingId);
                setModal(false);
            }} >{post.comments.length}개 댓글 보기 및 댓글쓰기</span>
            }
        </StyledInteraction>
    )
}

export default FeedInteraction;