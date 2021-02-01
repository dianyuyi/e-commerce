import React from 'react'
import { useGlobalContext } from "../../../context";
import { Typography, Card, CardActions,CardContent, CardMedia, Button} from "@material-ui/core"
import useStyles from './styles';

const CartItem = ({lineItem}) => {
  const classes = useStyles();
  const {handleUpdateCartQty,handleRemoveFromCart} = useGlobalContext()
  const {id, name, media, quantity,line_total} = lineItem
  return (
    <Card>
      <CardMedia image={media.source} alt={name} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography variant="subtitle1">{name}</Typography>
        <Typography variant="subtitle2">{line_total.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button type="button" size="small" onClick={()=> handleUpdateCartQty(id, quantity - 1)}>-</Button>
          <Typography>{quantity}</Typography>
          <Button type="button" size="small" onClick={()=> handleUpdateCartQty(id, quantity + 1)}>+</Button>
        </div>
        <Button variant="contained" type="button" color="secondary" onClick={()=> handleRemoveFromCart(id)}>Remove</Button>
      </CardActions>
    </Card>
  )
}

export default CartItem
