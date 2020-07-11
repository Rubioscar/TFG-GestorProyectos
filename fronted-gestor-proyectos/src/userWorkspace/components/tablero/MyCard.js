import React, {Component} from 'react'
import "../../assets/scss/index.scss";
import PropTypes from 'prop-types'

import {
  MovableCardWrapper,
  CardHeader,
  CardRightContent,
  CardTitle,
  Detail,
  Footer
} from 'react-trello/dist/styles/Base'
import Tag from "react-trello/dist/components/Card/Tag"
import DeleteButton from 'react-trello/dist/widgets/DeleteButton'

class Card extends Component {
  onDelete = e => {
    this.props.onDelete()
    e.stopPropagation()
  }

  render()  {
    const {
      showDeleteButton,
      style,
      tagStyle,
      onClick,
      onDelete,
      className,
      tags,
      cardDraggable,
      objeto
    } = this.props

    return (
      <MovableCardWrapper
        data-id={objeto ? objeto.id : 0}
        onClick={onClick}
        style={style}
        className={className}
      >
        <CardHeader>
          <CardTitle draggable={cardDraggable}>
            <i className="fas fa-arrow-up flecha"></i>
            &nbsp;
            {objeto ? objeto.title : 'soy el cmapeon'}
          </CardTitle>
          <CardRightContent className="estimacion">{objeto ? objeto.estimacion : 3}</CardRightContent>
          {showDeleteButton && <DeleteButton onClick={this.onDelete} />}
        </CardHeader>
        <Detail>{objeto ? objeto.descripcionCorta : 'descripcion corta'}</Detail>
        <Footer>
          <Tag key={objeto.tag} title={objeto.tag} bgcolor="green" tagStyle={tagStyle} />
          <Tag key={objeto.prioridad} title={objeto.prioridad} bgcolor="gray" tagStyle={tagStyle} />
        </Footer>
      </MovableCardWrapper>
      )
  }
}

Card.defaultProps = {
  showDeleteButton: true,
  onDelete: () => {},
  onClick: () => {},
  style: {},
  tagStyle: {},
  title: 'no title',
  description: '',
  label: '',
  tags: [],
  className: ''
}

export default Card