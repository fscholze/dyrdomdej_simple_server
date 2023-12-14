import type { Schema, Attribute } from '@strapi/strapi';

export interface AudioImageButtonAudioImageButton extends Schema.Component {
  collectionName: 'components_audio_img_btn_audio_img_btns';
  info: {
    displayName: 'AudioImageButton';
    description: '';
  };
  attributes: {
    text: Attribute.String & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
    sound: Attribute.Media;
    x: Attribute.Decimal &
      Attribute.SetMinMax<{
        min: 0;
        max: 100;
      }>;
    y: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
        max: 100;
      }>;
  };
}

export interface CategoryPathCategoryPath extends Schema.Component {
  collectionName: 'components_category_path_category_paths';
  info: {
    displayName: 'category-path';
  };
  attributes: {
    topic: Attribute.Relation<
      'category-path.category-path',
      'oneToOne',
      'api::topic.topic'
    >;
    category: Attribute.Relation<
      'category-path.category-path',
      'oneToOne',
      'api::keyword.keyword'
    >;
    sub_category: Attribute.Relation<
      'category-path.category-path',
      'oneToOne',
      'api::keyword.keyword'
    >;
  };
}

export interface WordingLineWordingList extends Schema.Component {
  collectionName: 'components_wording_line_wording_lists';
  info: {
    displayName: 'WordingListEntry';
    description: '';
  };
  attributes: {
    sorbian: Attribute.String & Attribute.Required;
    german: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'audio-image-button.audio-image-button': AudioImageButtonAudioImageButton;
      'category-path.category-path': CategoryPathCategoryPath;
      'wording-line.wording-list': WordingLineWordingList;
    }
  }
}
