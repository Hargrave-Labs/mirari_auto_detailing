import { defineField, defineType } from 'sanity'

export const service = defineType({
    name: 'service',
    title: 'Service',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
            description: 'E.g., "ESSENTIA", "CLARITAS", "ULTIMA"',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
            description: 'E.g., "Full Interior Detail"',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'Service description displayed on the frontend',
        }),
        defineField({
            name: 'highlight',
            title: 'Highlight (Most Popular)',
            type: 'boolean',
            description: 'If true, this service will be highlighted (e.g., Ultima)',
            initialValue: false,
        }),
        defineField({
            name: 'details',
            title: 'Service Details / Inclusions',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'The list of items included in this service package',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'subtitle',
        },
        prepare({ title, subtitle }) {
            return {
                title,
                subtitle,
            }
        },
    },
})
