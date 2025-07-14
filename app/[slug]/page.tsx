import ProfilePage from '@/components/profile-page';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ProfileSlugPage({ params }: PageProps) {
  return <ProfilePage slug={params.slug} />;
}

export async function generateMetadata({ params }: PageProps) {
  return {
    title: `${params.slug} - Social Link Manager`,
    description: `Visit ${params.slug}'s social media links and profile`,
  };
}