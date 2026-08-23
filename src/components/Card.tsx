import {
  Card,
  CardFooter,
} from "@/components/ui/card"
import VoteAveregeItem from "./VoteAveregeItem";

type Props = {
  poster_path?: string;
  vote_average: number;
  title?: string;
  release_date?: string
}

function CardItem({ poster_path, vote_average, title, release_date }: Props) {
  return (
    <>
      <Card className=" md:w-[200px] md:h-[516px] hover:drop-shadow-2xl cursor-pointer">
        <div>
          <img
            className='w-full object-cover rounded-t-md'
            src={poster_path}
            alt=""
          />
        </div>
        <CardFooter className="flex flex-col mt-5">
          <div className="self-start">
            <VoteAveregeItem
              vote_average={vote_average}
            />
          </div>
          <h2 className="mt-2 self-start font-bold hover:text-[#53B4E4] text-2xl sm:text-2xl md:text-base lg:text-base">{title }</h2>
          <span className="self-start text-[#717272]">{release_date }</span>
        </CardFooter>
      </Card>
    </>
  )
}

export default CardItem
