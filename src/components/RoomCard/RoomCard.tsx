import { Component } from 'solid-js'
import { A } from '@solidjs/router'
import { Room } from 'matrix-js-sdk'

import styles from './RoomCard.module.css'
import { useMatrix } from '~/contexts'

const avatarSize = 24

const RoomCard: Component<Props> = props => {
	const [matrix] = useMatrix()

	const avatar = props.room.getAvatarUrl(
		matrix.client!.getHomeserverUrl(),
		avatarSize,
		avatarSize,
		'scale',
	)

	return (
		<A href={`/room/${props.room.roomId}`} class={styles.RoomCard}>
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
		</A>
	)
}

export default RoomCard

interface Props {
	room: Room
}
