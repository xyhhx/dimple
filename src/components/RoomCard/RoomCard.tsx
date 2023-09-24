import { Component } from 'solid-js'
import { EventTimeline, Room } from 'matrix-js-sdk'

import styles from './RoomCard.module.css'
import { useMatrix } from '~/contexts'

const avatarSize = 24

const RoomCard: Component<Props> = props => {
	const [state] = useMatrix()

	const currentState = props.room
		.getLiveTimeline()
		.getState(EventTimeline.FORWARDS)

	const avatarEvent = currentState?.getStateEvents('m.room.avatar')
	const topicEvent = currentState?.getStateEvents('m.room.topic')

	const avatar = props.room.getAvatarUrl(
		state.client!.getHomeserverUrl(),
		avatarSize,
		avatarSize,
		'scale',
	)

	console.log({ avatar, avatarEvent, topicEvent })
	return (
		<div class={styles.RoomCard}>
			<aside class={styles.aside}>
				{avatar && (
					<img
						class={styles.img}
						src={avatar}
						height={avatarSize}
						width={avatarSize}
					/>
				)}
			</aside>
			<main class={styles.main}>
				<strong class={styles.name}>{props.room.name}</strong>
			</main>
		</div>
	)
}

export default RoomCard

interface Props {
	room: Room
}
