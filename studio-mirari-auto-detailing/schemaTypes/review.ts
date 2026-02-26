import { defineField, defineType } from 'sanity'

export const review = defineType({
    name: 'review',
    title: 'Client Review',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Client Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'rating',
            title: 'Star Rating',
            type: 'number',
            description: 'A number from 1 to 5',
            validation: (rule) => rule.required().min(1).max(5),
            initialValue: 5,
        }),
        defineField({
            name: 'description',
            title: 'Review Text',
            type: 'text',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'photos',
            title: 'Photos (Optional)',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'rating',
        },
        prepare({ title, subtitle }) {
            return {
                title,
                subtitle: `${subtitle} Stars`,
            }
        },
    },
})
