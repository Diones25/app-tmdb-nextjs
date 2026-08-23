
import {
  Card,
} from "@/components/ui/card"
import { Star } from "lucide-react"
import Link from "@/components/SafeLink";
const imageNotFound = "/assets/imageNotFound.png";

type Props = {
  avatar_path: string;
  name: string;
  rating: number;
  url: string;
  content: string;
}

const CardReview = ({ avatar_path, name, rating, url, content }: Props) => {

  return (
    <>
      <Link href={url}>
        <Card className="min-w-[320px] sm:min-w-[403px] h-[176px] rounded-sm">
          <div className="pl-4 pt-4">
            <div className="flex items-center">
              <>
                {avatar_path !== null ? (
                  <img
                    className="w-8 h-8 rounded-full mr-2"
                    src={`https://media.themoviedb.org/t/p/w45_and_h45_face/${avatar_path}`}
                    alt="Imagem de avatar do Autor"
                  />
                ) : (
                  <img src={imageNotFound} alt="" className="w-8 h-8 rounded-full mr-2" />
                )}
              </>

              <p className="mr-2">{name}</p>
              <Star className="mr-1 text-yellow-400" size={16} />
              <span>{rating}</span>
            </div>
            <div className="mt-4">
              <p>{content}</p>
            </div>
          </div>
        </Card>
      </Link>
    </>
  )
}

export default CardReview
