import type { Schema, Attribute } from '@strapi/strapi'

export interface WordingLineWordingList extends Schema.Component {
  collectionName: 'components_wording_line_wording_lists'
  info: {
    displayName: 'WordingListEntry'
    description: ''
  }
  attributes: {
    sorbian: Attribute.String & Attribute.Required
    german: Attribute.String & Attribute.Required
  }
}

export interface CategoryPathCategoryPath extends Schema.Component {
  collectionName: 'components_cat_path_cat_paths'
  info: {
    displayName: 'category-path'
    description: ''
  }
  attributes: {
    topic: Attribute.Relation<'category-path.category-path', 'oneToOne', 'api::topic.topic'>
    sub_category: Attribute.Relation<
      'category-path.category-path',
      'oneToOne',
      'api::subcategory.subcategory'
    >
    category: Attribute.Relation<
      'category-path.category-path',
      'oneToOne',
      'api::category.category'
    >
  }
}

export interface AudioImageButtonAudioImageButton extends Schema.Component {
  collectionName: 'components_audio_img_btn_audio_img_btns'
  info: {
    displayName: 'AudioImageButton'
    description: ''
  }
  attributes: {
    text: Attribute.String & Attribute.Required
    image: Attribute.Media<'images'>
    sound: Attribute.Media<'audios'> & Attribute.Required
    x: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0
          max: 100
        },
        number
      >
    y: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0
          max: 100
        },
        number
      >
  }
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'wording-line.wording-list': WordingLineWordingList
      'category-path.category-path': CategoryPathCategoryPath
      'audio-image-button.audio-image-button': AudioImageButtonAudioImageButton
    }
  }
}
