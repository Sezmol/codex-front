import { useState } from "react";
import { useLoaderData, useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { ArrowDown, ArrowUp, Heart, TagIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useLikePost, useUnlikePost } from "@/api/posts/postsHooks";
import { Post } from "@/api/posts/postsTypes";
import { DIRECTION_TEXT, POST_TYPE_TEXT } from "@/constants";
import { ROUTES } from "@/constants/routerPaths";
import { cn } from "@/lib/utils";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Separator } from "@/ui/separator";
import { Typography } from "@/ui/Typography";

import { CardActions } from "./CardActions";

interface PostCardProps {
  post: Post;
}

const MAX_POST_CONTENT_LENGTH = 500;

export const PostCard = ({ post }: PostCardProps) => {
  const user = useLoaderData({ from: "__root__" });

  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();

  const { mutate: likePost, isPending: isPostLikePending } = useLikePost();
  const { mutate: unlikePost, isPending: isPostUnlikePending } =
    useUnlikePost();

  const liked = post.likedBy.some(({ _id }) => _id === user?._id);

  const toggleLike = () => {
    const fn = liked ? unlikePost : likePost;

    fn(post._id);
  };

  const onAuthorClick = () => {
    navigate({ to: ROUTES.PROFILE, params: { userId: post.author._id } });
  };

  const contentEllipsis =
    post.content.length > MAX_POST_CONTENT_LENGTH ? "..." : "";

  const postContent = isExpanded
    ? post.content
    : `${post.content.slice(0, MAX_POST_CONTENT_LENGTH)}${contentEllipsis}`;

  return (
    <div className="flex flex-col shadow rounded-xl border bg-card p-4">
      <div className="flex items-center gap-1">
        <Button variant="link" className="p-0">
          <Typography
            onClick={onAuthorClick}
            type="p"
            className="font-medium text-base cursor-pointer"
            text={post.author.nickname}
          />
        </Button>

        <Typography
          text={dayjs(post.createdAt).format("DD.MM.YYYY HH:mm")}
          type="p"
          className="text-muted-foreground"
        />

        {post.author._id === user?._id && <CardActions post={post} />}
      </div>

      <Typography text={post.title} type="h4" />

      <div className="flex gap-x-2 my-3">
        <Badge variant="secondary">
          <TagIcon />
          {POST_TYPE_TEXT[post.type]}
        </Badge>
        <Badge variant="secondary">
          <TagIcon />
          {DIRECTION_TEXT[post.direction]}
        </Badge>
      </div>

      {post.previewImage && (
        <img src={post.previewImage} alt="Post Preview" className="w-16 h-16" />
      )}

      <div className="flex flex-col gap-y-2">
        <div className="markdown-reset">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {postContent}
          </ReactMarkdown>
        </div>

        {post.content.length > MAX_POST_CONTENT_LENGTH && (
          <Button
            onClick={() => setIsExpanded((prev) => !prev)}
            variant="ghost"
            className="w-fit"
          >
            {isExpanded ? (
              <>
                Show less <ArrowUp size={16} />
              </>
            ) : (
              <>
                Show all <ArrowDown size={16} />
              </>
            )}
          </Button>
        )}
      </div>

      <Separator className="my-3" />

      <div className="flex items-center gap-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleLike}
          disabled={isPostLikePending || isPostUnlikePending}
        >
          <Heart
            size={20}
            className={cn(
              "cursor-pointer hover:text-red-500 transition duration-200",
              liked && "fill-red-500 text-red-500",
            )}
          />
        </Button>

        <Typography text={post.likes} type="p" />
      </div>
    </div>
  );
};
