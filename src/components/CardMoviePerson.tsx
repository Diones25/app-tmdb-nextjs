
type Props = {
  key?: number | string;
  poster_path: string;
  title: string;
}

const CardMoviePerson = ({ key, poster_path, title }: Props) => {
  return (
    <>
      <div key={key} className="">
        <div className="w-[130px]">
          <img className="w-[130px] h-[195px] rounded-sm" src={poster_path} alt="" />
          <div className="mt-2 text-black">
            <p className="text-center text-[14px]">{title}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardMoviePerson
