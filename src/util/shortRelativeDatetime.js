/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { translate as t } from '@nextcloud/l10n'
import moment from '@nextcloud/moment'
import curry from 'lodash/fp/curry.js'

const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())

function startOfPreviousDay(date) {
	const start = startOfDay(date)
	start.setDate(start.getDate() - 1)
	return start
}

export const shortDatetime = curry((ref, date) => {
	const momentDate = moment(date)
	// Today or yesterday?
	if (date >= startOfPreviousDay(ref)) {
		return momentDate.format('LT')
	}
	// Within the previous week?
	if (date.getTime() > (ref.getTime() - 30 * 60 * 24 * 7 * 1000)) {
		return momentDate.format('dd')
	}
	// Within the previous year?
	if (date.getTime() > (ref.getTime() - 30 * 60 * 24 * 365 * 1000)) {
		return momentDate.format('MMM D')
	}
	// Older
	return momentDate.format('MMM D, YYYY')
})

export const longDatetime = curry((ref, date) => {
	// Yesterday?
	if (date < startOfDay(ref) && date >= startOfPreviousDay(ref)) {
		return t('mail', 'Yesterday {time}', { time: moment(date).format('LT') })
	}
	return shortDatetime(ref, date)
})

export function messageDateTime(date) {
	return moment(date * 1000).format('lll')
}

export const shortRelativeDatetime = (date) => shortDatetime(new Date(), date)
export const longRelativeDatetime = (date) => longDatetime(new Date(), date)
