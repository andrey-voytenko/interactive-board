import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'limitTo',
})
export class TruncatePipe {
	private readonly DEFAULT_TRANCATE_LIMIT: number = 400;

	transform(value: string, userLimit: number): string {
		let limit = userLimit || this.DEFAULT_TRANCATE_LIMIT;
		let trail = '...';

		return value.length > limit ? value.substring(0, limit) + trail : value;
	}
}
