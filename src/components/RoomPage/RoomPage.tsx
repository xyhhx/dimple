import {
	Component,
	Show,
	createEffect,
	createSignal,
	onCleanup,
} from 'solid-js'
import { useParams } from '@solidjs/router'

import { Sidebar } from '~/components'

import styles from './RoomPage.module.css'
import { useMatrix } from '~/contexts'
import { EventEmitterEvents, Room } from 'matrix-js-sdk'

const Loading = () => <p>Loading...</p>

const ChatView = props => {
	const [matrix] = useMatrix()
	const showTimeline = ref => {
		const evt = 'Room.timeline'
		const timelineEventHandler = (event, room, toStartOfTimeline) => {
			console.log({ event, room, toStartOfTimeline })
			if (toStartOfTimeline) return // don't print paginated results
			if (event.getType() !== 'm.room.message') return // only print messages

			console.log(
				// the room name will update with m.room.name events automatically

				{
					room: room.name,
					sender: event.getSender(),
					msg: event.getContent().body,
				},
			)
		}

		console.log('setting timeline listener', matrix.client)
		matrix.client && matrix.client.on(evt, timelineEventHandler)

		onCleanup(() => {
			console.log('removing timeline listener')
			matrix.client?.off(evt, timelineEventHandler)
		})
	}

	// @ts-ignore
	return <div use:showTimeline></div>
}

const RoomPage: Component<{}> = props => {
	const params = useParams()
	const [matrix] = useMatrix()

	globalThis.params = params
	// const [room, setRoom] = createSignal<Room | null>(null)

	const room = matrix.client && matrix.client.getRoom(params.id)
	console.log({ room })

	return (
		<div class={styles.RoomPage}>
			<Sidebar />
			<main class={styles.main}>
				<Show when={room} fallback={<Loading />}>
					<ChatView />
				</Show>
			</main>
		</div>
	)
}
export default RoomPage
