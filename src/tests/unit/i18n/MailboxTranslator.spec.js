/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { translate } from '../../../i18n/MailboxTranslator.js'

describe('MailboxTranslator', () => {
	it('translates the inbox', () => {
		const mailbox = {
			name: 'INBOX',
			specialUse: ['inbox'],
		}

		const name = translate(mailbox)

		expect(name).toEqual('Inbox')
	})

	it('translates the sent mailbox', () => {
		const mailbox = {
			name: 'Sent Items',
			specialUse: ['sent'],
		}

		expect(translate(mailbox)).toEqual('Sent')
	})

	it('translates the unified sent mailbox', () => {
		const mailbox = {
			name: 'UNIFIED SENT',
			specialUse: ['sent'],
			isUnified: true,
		}

		expect(translate(mailbox)).toEqual('All sent')
	})

	it('does not translate an arbitrary mailbox', () => {
		const mailbox = {
			name: 'Newsletters',
			displayName: 'Newsletters',
			specialUse: [],
		}

		const name = translate(mailbox)

		expect(name).toEqual('Newsletters')
	})
})
