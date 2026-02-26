import React, { useCallback, useEffect, useState } from 'react'
import { Checkbox, Box, Text, Stack, Card, Flex, Spinner } from '@sanity/ui'
import { set, unset, useClient } from 'sanity'

export const ServiceCheckboxes = (props: any) => {
    const { value = [], onChange } = props
    const client = useClient({ apiVersion: '2023-05-01' })
    const [services, setServices] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        client.fetch(`*[_type == "service" && !(_id in path("drafts.**"))]{_id, title} | order(title asc)`).then((res) => {
            setServices(res)
            setIsLoading(false)
        })
    }, [client])

    const handleChange = useCallback(
        (event: any) => {
            const isChecked = event.currentTarget.checked
            const serviceId = event.currentTarget.value

            const newValue = [...value]

            if (isChecked) {
                newValue.push({
                    _type: 'reference',
                    _ref: serviceId,
                    _key: Math.random().toString(36).substring(7),
                })
            } else {
                const index = newValue.findIndex((v: any) => v._ref === serviceId)
                if (index > -1) {
                    newValue.splice(index, 1)
                }
            }

            onChange(newValue.length > 0 ? set(newValue) : unset())
        },
        [value, onChange]
    )

    if (isLoading) {
        return <Spinner />
    }

    return (
        <Stack space={3}>
            {services.map((service) => {
                const isChecked = value.some(
                    (v: any) => v._ref === service._id || v._ref === service._id.replace('drafts.', '')
                )
                return (
                    <Card key={service._id} padding={2} radius={2} tone="transparent">
                        <Flex align="center">
                            <Checkbox
                                id={service._id}
                                value={service._id.replace('drafts.', '')}
                                checked={isChecked}
                                onChange={handleChange}
                            />
                            <Box flex={1} paddingLeft={3}>
                                <Text>
                                    <label htmlFor={service._id} style={{ cursor: 'pointer', display: 'block' }}>{service.title}</label>
                                </Text>
                            </Box>
                        </Flex>
                    </Card>
                )
            })}
        </Stack>
    )
}
