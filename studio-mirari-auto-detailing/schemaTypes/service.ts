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
        defineField({
            name: 'bookingUrl',
            title: 'Square Booking Link',
            type: 'url',
            description:
                'Link this package straight to its booking page. Open the Square booking site, ' +
                'click this package, then copy the address bar (it ends in /services/...). ' +
                'Leave blank to send customers to the main booking page instead — do that for ' +
                'packages with several options to choose from, like Ultima.',
            validation: (rule) => rule.uri({ scheme: ['https'] }),
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
