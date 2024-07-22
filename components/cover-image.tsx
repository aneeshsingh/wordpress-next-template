import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  coverImage?: {
    node?: {
      sourceUrl?: string;
    };
  };
  slug?: string;
}
const DEFAULT_COVER_IMAGE_URL = 'http://34.70.84.48:8000/wp-content/uploads/2024/07/free-photo-of-aerial-view-of-water-splashing-on-a-rocky-shore-1024x694.jpeg';

export default function CoverImage({ title, coverImage, slug }: Props) {
  const coverImageUrl = coverImage?.node?.sourceUrl || DEFAULT_COVER_IMAGE_URL;

  const image = (
      <Image
          width={2000}
          height={1000}
          alt={`Cover Image for ${title}`}
          src={coverImage?.node?.sourceUrl || DEFAULT_COVER_IMAGE_URL}
          className={`shadow-small ${slug ? "hover:shadow-medium transition-shadow duration-200" : ""}`}
      />
  );

  return (
      <div className="sm:mx-0">
        {slug ? (
            <Link href={`/posts/${slug}`} aria-label={title}>
              {image}
            </Link>
        ) : (
            image
        )}
      </div>
  );
}
