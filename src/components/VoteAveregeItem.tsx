type Props = {
  vote_average: number | any
}

const VoteAveregeItem = ({ vote_average }: Props) => {
  return (
    <>
      <div className={`progress-circle over50 p${(vote_average * 10).toFixed(0)}`}>
        <span className="number">{(vote_average * 10).toFixed(0)}</span>
        <span className="percent">%</span>
        <div className="left-half-clipper">
          <div className="first50-bar"></div>
          <div className="value-bar"></div>
        </div>
      </div>
    </>
  )
}

export default VoteAveregeItem
