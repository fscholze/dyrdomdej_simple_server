import {
  CollectionTypeSchema,
  StringAttribute,
  RequiredAttribute,
  SetMinMaxLength,
  JSONAttribute,
  DefaultTo,
  RelationAttribute,
  DateTimeAttribute,
  PrivateAttribute,
  EmailAttribute,
  UniqueAttribute,
  PasswordAttribute,
  BooleanAttribute,
  EnumerationAttribute,
  BigIntegerAttribute,
  IntegerAttribute,
  DecimalAttribute,
  SetMinMax,
  SingleTypeSchema,
  MediaAttribute,
  ComponentAttribute,
  RichTextAttribute,
  CustomField,
  ComponentSchema
} from '@strapi/strapi'

export interface AdminPermission extends CollectionTypeSchema {
  info: {
    name: 'Permission'
    description: ''
    singularName: 'permission'
    pluralName: 'permissions'
    displayName: 'Permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    subject: StringAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    properties: JSONAttribute & DefaultTo<{}>
    conditions: JSONAttribute & DefaultTo<[]>
    role: RelationAttribute<'admin::permission', 'manyToOne', 'admin::role'>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<'admin::permission', 'oneToOne', 'admin::user'> & PrivateAttribute
    updatedBy: RelationAttribute<'admin::permission', 'oneToOne', 'admin::user'> & PrivateAttribute
  }
}

export interface AdminUser extends CollectionTypeSchema {
  info: {
    name: 'User'
    description: ''
    singularName: 'user'
    pluralName: 'users'
    displayName: 'User'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    firstname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    lastname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    username: StringAttribute
    email: EmailAttribute &
      RequiredAttribute &
      PrivateAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 6
      }>
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6
      }>
    resetPasswordToken: StringAttribute & PrivateAttribute
    registrationToken: StringAttribute & PrivateAttribute
    isActive: BooleanAttribute & PrivateAttribute & DefaultTo<false>
    roles: RelationAttribute<'admin::user', 'manyToMany', 'admin::role'> & PrivateAttribute
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>
    preferedLanguage: StringAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> & PrivateAttribute
    updatedBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> & PrivateAttribute
  }
}

export interface AdminRole extends CollectionTypeSchema {
  info: {
    name: 'Role'
    description: ''
    singularName: 'role'
    pluralName: 'roles'
    displayName: 'Role'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    code: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    description: StringAttribute
    users: RelationAttribute<'admin::role', 'manyToMany', 'admin::user'>
    permissions: RelationAttribute<'admin::role', 'oneToMany', 'admin::permission'>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> & PrivateAttribute
    updatedBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> & PrivateAttribute
  }
}

export interface AdminApiToken extends CollectionTypeSchema {
  info: {
    name: 'Api Token'
    singularName: 'api-token'
    pluralName: 'api-tokens'
    displayName: 'Api Token'
    description: ''
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1
      }> &
      DefaultTo<''>
    type: EnumerationAttribute<['read-only', 'full-access', 'custom']> &
      RequiredAttribute &
      DefaultTo<'read-only'>
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    lastUsedAt: DateTimeAttribute
    permissions: RelationAttribute<'admin::api-token', 'oneToMany', 'admin::api-token-permission'>
    expiresAt: DateTimeAttribute
    lifespan: BigIntegerAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<'admin::api-token', 'oneToOne', 'admin::user'> & PrivateAttribute
    updatedBy: RelationAttribute<'admin::api-token', 'oneToOne', 'admin::user'> & PrivateAttribute
  }
}

export interface AdminApiTokenPermission extends CollectionTypeSchema {
  info: {
    name: 'API Token Permission'
    description: ''
    singularName: 'api-token-permission'
    pluralName: 'api-token-permissions'
    displayName: 'API Token Permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    token: RelationAttribute<'admin::api-token-permission', 'manyToOne', 'admin::api-token'>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<'admin::api-token-permission', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'admin::api-token-permission', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface PluginUploadFile extends CollectionTypeSchema {
  info: {
    singularName: 'file'
    pluralName: 'files'
    displayName: 'File'
    description: ''
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: StringAttribute & RequiredAttribute
    alternativeText: StringAttribute
    caption: StringAttribute
    width: IntegerAttribute
    height: IntegerAttribute
    formats: JSONAttribute
    hash: StringAttribute & RequiredAttribute
    ext: StringAttribute
    mime: StringAttribute & RequiredAttribute
    size: DecimalAttribute & RequiredAttribute
    url: StringAttribute & RequiredAttribute
    previewUrl: StringAttribute
    provider: StringAttribute & RequiredAttribute
    provider_metadata: JSONAttribute
    related: RelationAttribute<'plugin::upload.file', 'morphToMany'>
    folder: RelationAttribute<'plugin::upload.file', 'manyToOne', 'plugin::upload.folder'> &
      PrivateAttribute
    folderPath: StringAttribute &
      RequiredAttribute &
      PrivateAttribute &
      SetMinMax<{
        min: 1
      }>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<'plugin::upload.file', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'plugin::upload.file', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface PluginUploadFolder extends CollectionTypeSchema {
  info: {
    singularName: 'folder'
    pluralName: 'folders'
    displayName: 'Folder'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1
      }>
    pathId: IntegerAttribute & RequiredAttribute & UniqueAttribute
    parent: RelationAttribute<'plugin::upload.folder', 'manyToOne', 'plugin::upload.folder'>
    children: RelationAttribute<'plugin::upload.folder', 'oneToMany', 'plugin::upload.folder'>
    files: RelationAttribute<'plugin::upload.folder', 'oneToMany', 'plugin::upload.file'>
    path: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1
      }>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<'plugin::upload.folder', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'plugin::upload.folder', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface PluginI18NLocale extends CollectionTypeSchema {
  info: {
    singularName: 'locale'
    pluralName: 'locales'
    collectionName: 'locales'
    displayName: 'Locale'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: StringAttribute &
      SetMinMax<{
        min: 1
        max: 50
      }>
    code: StringAttribute & UniqueAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<'plugin::i18n.locale', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'plugin::i18n.locale', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface PluginUsersPermissionsPermission extends CollectionTypeSchema {
  info: {
    name: 'permission'
    description: ''
    singularName: 'permission'
    pluralName: 'permissions'
    displayName: 'Permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: StringAttribute & RequiredAttribute
    role: RelationAttribute<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface PluginUsersPermissionsRole extends CollectionTypeSchema {
  info: {
    name: 'role'
    description: ''
    singularName: 'role'
    pluralName: 'roles'
    displayName: 'Role'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 3
      }>
    description: StringAttribute
    type: StringAttribute & UniqueAttribute
    permissions: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >
    users: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<'plugin::users-permissions.role', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'plugin::users-permissions.role', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface PluginUsersPermissionsUser extends CollectionTypeSchema {
  info: {
    name: 'user'
    description: ''
    singularName: 'user'
    pluralName: 'users'
    displayName: 'User'
  }
  options: {
    draftAndPublish: false
    timestamps: true
  }
  attributes: {
    username: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 3
      }>
    email: EmailAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 6
      }>
    provider: StringAttribute
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6
      }>
    resetPasswordToken: StringAttribute & PrivateAttribute
    confirmationToken: StringAttribute & PrivateAttribute
    confirmed: BooleanAttribute & DefaultTo<false>
    blocked: BooleanAttribute & DefaultTo<false>
    role: RelationAttribute<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<'plugin::users-permissions.user', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'plugin::users-permissions.user', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface ApiActiveMaterialActiveMaterial extends SingleTypeSchema {
  info: {
    singularName: 'active-material'
    pluralName: 'active-materials'
    displayName: 'Aktualny Material'
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    material: RelationAttribute<
      'api::active-material.active-material',
      'oneToOne',
      'api::material.material'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    publishedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      'api::active-material.active-material',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      'api::active-material.active-material',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute
  }
}

export interface ApiAudioImageAudioImage extends CollectionTypeSchema {
  info: {
    singularName: 'audio-image'
    pluralName: 'audio-images'
    displayName: 'AudioImage'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    title: StringAttribute & RequiredAttribute
    image: MediaAttribute & RequiredAttribute
    topics: RelationAttribute<'api::audio-image.audio-image', 'manyToMany', 'api::topic.topic'>
    audioImages: ComponentAttribute<'audio-image-button.audio-image-button', true>
    isLive: BooleanAttribute & RequiredAttribute
    keywords: RelationAttribute<
      'api::audio-image.audio-image',
      'manyToMany',
      'api::keyword.keyword'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    publishedAt: DateTimeAttribute
    createdBy: RelationAttribute<'api::audio-image.audio-image', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'api::audio-image.audio-image', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface ApiKeywordKeyword extends CollectionTypeSchema {
  info: {
    singularName: 'keyword'
    pluralName: 'keywords'
    displayName: 'Keyword'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    title: StringAttribute & RequiredAttribute
    image: MediaAttribute & RequiredAttribute
    wording_lists: RelationAttribute<
      'api::keyword.keyword',
      'manyToMany',
      'api::wording-list.wording-list'
    >
    isLive: BooleanAttribute & RequiredAttribute
    songs: RelationAttribute<'api::keyword.keyword', 'manyToMany', 'api::song.song'>
    audio_images: RelationAttribute<
      'api::keyword.keyword',
      'manyToMany',
      'api::audio-image.audio-image'
    >
    materials: RelationAttribute<'api::keyword.keyword', 'manyToMany', 'api::material.material'>
    videos: RelationAttribute<'api::keyword.keyword', 'manyToMany', 'api::video.video'>
    topics: RelationAttribute<'api::keyword.keyword', 'manyToMany', 'api::topic.topic'>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    publishedAt: DateTimeAttribute
    createdBy: RelationAttribute<'api::keyword.keyword', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'api::keyword.keyword', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface ApiMaterialMaterial extends CollectionTypeSchema {
  info: {
    singularName: 'material'
    pluralName: 'materials'
    displayName: 'Material'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    title: StringAttribute & RequiredAttribute
    cover: MediaAttribute & RequiredAttribute
    downloads: MediaAttribute
    topics: RelationAttribute<'api::material.material', 'manyToMany', 'api::topic.topic'>
    isLive: BooleanAttribute & RequiredAttribute
    text: RichTextAttribute &
      CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'toolbar'
        }
      >
    keywords: RelationAttribute<'api::material.material', 'manyToMany', 'api::keyword.keyword'>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<'api::material.material', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'api::material.material', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface ApiSongSong extends CollectionTypeSchema {
  info: {
    singularName: 'song'
    pluralName: 'songs'
    displayName: 'Sp\u011Bwy'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    title: StringAttribute & RequiredAttribute
    downloads: MediaAttribute
    text: RichTextAttribute &
      CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'toolbar'
        }
      >
    cover: MediaAttribute & RequiredAttribute
    topics: RelationAttribute<'api::song.song', 'manyToMany', 'api::topic.topic'>
    isLive: BooleanAttribute & RequiredAttribute
    keywords: RelationAttribute<'api::song.song', 'manyToMany', 'api::keyword.keyword'>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    publishedAt: DateTimeAttribute
    createdBy: RelationAttribute<'api::song.song', 'oneToOne', 'admin::user'> & PrivateAttribute
    updatedBy: RelationAttribute<'api::song.song', 'oneToOne', 'admin::user'> & PrivateAttribute
  }
}

export interface ApiTopicTopic extends CollectionTypeSchema {
  info: {
    singularName: 'topic'
    pluralName: 'topics'
    displayName: 'Tema'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    title: StringAttribute & RequiredAttribute
    image: MediaAttribute & RequiredAttribute
    isLive: BooleanAttribute & RequiredAttribute
    materials: RelationAttribute<'api::topic.topic', 'manyToMany', 'api::material.material'>
    songs: RelationAttribute<'api::topic.topic', 'manyToMany', 'api::song.song'>
    videos: RelationAttribute<'api::topic.topic', 'manyToMany', 'api::video.video'>
    audio_images: RelationAttribute<
      'api::topic.topic',
      'manyToMany',
      'api::audio-image.audio-image'
    >
    keywords: RelationAttribute<'api::topic.topic', 'manyToMany', 'api::keyword.keyword'>
    wording_lists: RelationAttribute<
      'api::topic.topic',
      'manyToMany',
      'api::wording-list.wording-list'
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    publishedAt: DateTimeAttribute
    createdBy: RelationAttribute<'api::topic.topic', 'oneToOne', 'admin::user'> & PrivateAttribute
    updatedBy: RelationAttribute<'api::topic.topic', 'oneToOne', 'admin::user'> & PrivateAttribute
  }
}

export interface ApiVideoVideo extends CollectionTypeSchema {
  info: {
    singularName: 'video'
    pluralName: 'videos'
    displayName: 'Widea'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    title: StringAttribute & RequiredAttribute
    topics: RelationAttribute<'api::video.video', 'manyToMany', 'api::topic.topic'>
    isLive: BooleanAttribute & RequiredAttribute
    youtubeLink: StringAttribute & RequiredAttribute
    keywords: RelationAttribute<'api::video.video', 'manyToMany', 'api::keyword.keyword'>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    publishedAt: DateTimeAttribute
    createdBy: RelationAttribute<'api::video.video', 'oneToOne', 'admin::user'> & PrivateAttribute
    updatedBy: RelationAttribute<'api::video.video', 'oneToOne', 'admin::user'> & PrivateAttribute
  }
}

export interface ApiWordingListWordingList extends CollectionTypeSchema {
  info: {
    singularName: 'wording-list'
    pluralName: 'wording-lists'
    displayName: 'Slowne Lisciny'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    title: StringAttribute & RequiredAttribute
    topics: RelationAttribute<'api::wording-list.wording-list', 'manyToMany', 'api::topic.topic'>
    words: ComponentAttribute<'wording-line.wording-list', true>
    keywords: RelationAttribute<
      'api::wording-list.wording-list',
      'manyToMany',
      'api::keyword.keyword'
    >
    cover: MediaAttribute & RequiredAttribute
    isLive: BooleanAttribute & RequiredAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    publishedAt: DateTimeAttribute
    createdBy: RelationAttribute<'api::wording-list.wording-list', 'oneToOne', 'admin::user'> &
      PrivateAttribute
    updatedBy: RelationAttribute<'api::wording-list.wording-list', 'oneToOne', 'admin::user'> &
      PrivateAttribute
  }
}

export interface AudioImageButtonAudioImageButton extends ComponentSchema {
  info: {
    displayName: 'AudioImageButton'
    description: ''
  }
  attributes: {
    text: StringAttribute & RequiredAttribute
    image: MediaAttribute & RequiredAttribute
    sound: MediaAttribute
    x: DecimalAttribute &
      SetMinMax<{
        min: 0
        max: 100
      }>
    y: DecimalAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 0
        max: 100
      }>
  }
}

export interface WordingLineWordingList extends ComponentSchema {
  info: {
    displayName: 'WordingListEntry'
    description: ''
  }
  attributes: {
    sorbian: StringAttribute & RequiredAttribute
    german: StringAttribute & RequiredAttribute
  }
}

declare global {
  namespace Strapi {
    interface Schemas {
      'admin::permission': AdminPermission
      'admin::user': AdminUser
      'admin::role': AdminRole
      'admin::api-token': AdminApiToken
      'admin::api-token-permission': AdminApiTokenPermission
      'plugin::upload.file': PluginUploadFile
      'plugin::upload.folder': PluginUploadFolder
      'plugin::i18n.locale': PluginI18NLocale
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission
      'plugin::users-permissions.role': PluginUsersPermissionsRole
      'plugin::users-permissions.user': PluginUsersPermissionsUser
      'api::active-Material.active-Material': ApiActiveMaterialActiveMaterial
      'api::audio-image.audio-image': ApiAudioImageAudioImage
      'api::keyword.keyword': ApiKeywordKeyword
      'api::material.material': ApiMaterialMaterial
      'api::song.song': ApiSongSong
      'api::topic.topic': ApiTopicTopic
      'api::video.video': ApiVideoVideo
      'api::wording-list.wording-list': ApiWordingListWordingList
      'audio-image-button.audio-image-button': AudioImageButtonAudioImageButton
      'wording-line.wording-list': WordingLineWordingList
    }
  }
}
