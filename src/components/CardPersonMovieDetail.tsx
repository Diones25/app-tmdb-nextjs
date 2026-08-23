import {
  Card,
  CardFooter,
} from "@/components/ui/card"

type Props = {
  profile_path?: string;
  vote_average?: number;
  name?: string;
  character?: string;
  release_date?: string
}

const CardPersonMovieDetail = ({ profile_path, name, character }: Props) => {
  return (
    <>
      <Card className="w-[140px] h-[320px] rounded-sm hover:drop-shadow-2xl cursor-pointer">
        <div>
          <img
            className='w-[140px] h-[200px] object-cover rounded-t-md'
            src={profile_path}
            alt=""
          />
        </div>
        <CardFooter className="flex flex-col mt-5">
          <div className="self-start ml-[-13px] mt-[-10px]">
            <h2 className=" font-bold text-sm hover:text-[#53B4E4]">{name}</h2>
            <p className="text-sm">{ character }</p>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

export default CardPersonMovieDetail
