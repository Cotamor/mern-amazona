const Rating = ({ rating, numReviews }) => {
  return (
    <>
      {/* <i class="fas fa-star"></i>
    <i class="far fa-star"></i>
    <i class="fas fa-star-half-alt"></i> */}
      <div className="rating">
        <span>
          <i
            className={
              rating >= 1
                ? 'fas fa-star'
                : rating >= 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          />
        </span>
        <span>
          <i
            className={
              rating >= 2
                ? 'fas fa-star'
                : rating >= 1.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          />
        </span>
        <span>
          <i
            className={
              rating >= 3
                ? 'fas fa-star'
                : rating >= 2.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          />
        </span>
        <span>
          <i
            className={
              rating >= 4
                ? 'fas fa-star'
                : rating >= 3.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          />
        </span>
        <span>
          <i
            className={
              rating >= 5
                ? 'fas fa-star'
                : rating >= 4.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          />
        </span>
        <span> {numReviews} reviews</span>
      </div>
    </>
  )
}
export default Rating
