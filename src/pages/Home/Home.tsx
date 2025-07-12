import { useGetPosts } from "@/shared/api/posts/postsHooks";
import { PostsContainer } from "@/widgets/PostsContainer";
import { PostsFilters } from "@/widgets/PostsFilters";
import { Route } from "@/app/routes";
import { Typography } from "@/shared/ui/Typography";

export const Home = () => {
  const filters = Route.useSearch();

  const { data: posts, isError, isLoading } = useGetPosts(filters);

  if (isError) {
    return (
      <Typography
        text="Error while loading posts"
        type="p"
        className="self-center text-destructive"
      />
    );
  }

  return (
    <div className="flex gap-8">
      <PostsFilters initialFilters={filters} disabled={isLoading} />
      <PostsContainer posts={posts} isLoading={isLoading} isError={isError} />
    </div>
  );
};
