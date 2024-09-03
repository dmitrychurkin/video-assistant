import { VideoCropper } from './domain';
import type { VideoRange } from './types';

export class Service extends VideoCropper {
    public async crop({ start, end }: VideoRange) {
        const fileData = await this.driver.process({
            input: [
                this.resource.name,
                await this.resource.toResourceData()
            ],
            exec: [
                [
                    '-ss',
                    `${this.parseVideoRangeValue(start)}`,
                    '-i',
                    this.resource.name,
                    '-t',
                    `${this.parseVideoRangeValue(end)}`,
                    '-c:v',
                    'copy',
                    `${this.output}`
                ]
            ],
            output: [this.output]
        });

        this.resource.download(
            new File([fileData], this.output, { type: this.resource.type })
        );
    }
}

export default VideoCropper;
