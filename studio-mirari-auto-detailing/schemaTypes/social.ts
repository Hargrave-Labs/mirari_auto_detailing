import { defineField, defineType } from 'sanity'

export const social = defineType({
    name: 'social',
    title: 'Social Link',
    type: 'document',
    fields: [
        defineField({
            name: 'platform',
            title: 'Platform Name',
            type: 'string',
            description: 'e.g. Instagram, Email, TikTok, Facebook',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'url',
            title: 'URL / Link',
            type: 'string',
            description: 'The URL for the social link (e.g. https://instagram.com/... or mailto:example@gmail.com)',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number',
            description: 'Used to sort the links (lower numbers appear first)',
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            title: 'platform',
            subtitle: 'url',
        },
    },
})
