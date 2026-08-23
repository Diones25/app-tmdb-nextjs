
type Props = {
  backdrop_path: string;
  title: string;
  vote_average: number | string;
}

const MoviesRecommended = ({ backdrop_path, title, vote_average }: Props) => {
  return (
    <>
      <div className="">
        <div className="w-[250px]">
          <img className="rounded-sm w-[250px] h-[140px]" src={backdrop_path} alt="" />
          <div className="flex justify-between mt-2 text-black">
            <p>{title}</p>
            <p>{vote_average}%</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default MoviesRecommended
