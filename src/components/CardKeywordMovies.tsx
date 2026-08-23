
type Props = {
  key: number | string;
  poster_path: string;
  title: string;
  original_title: string;
  release_date: string;
  overview: string;
}

const CardKeywordMovies = ({ key, poster_path, title, original_title, release_date, overview}: Props) => {
  return (
    <>
      <div key={key} className="border rounded-sm mb-4">
        <div className="flex">
          <div>
            <img className="min-w-[8rem] h-[9.5rem] rounded-l-sm" src={poster_path} alt="" />
          </div>

          <div className="ml-4 mt-4">
            <div className="flex">
              <h1 className="mr-2 font-bold">{ title }</h1>
              <h1 className="font-light">{ original_title }</h1>
            </div>
            <p className="text-gray-400">{ release_date }</p>
            <p className="mt-4">
              { overview }
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardKeywordMovies
