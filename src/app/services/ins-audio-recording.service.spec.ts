import { TestBed } from '@angular/core/testing';

import { InsAudioRecordingService } from './ins-audio-recording.service';

describe('InsAudioRecordingService', () => {
  let service: InsAudioRecordingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsAudioRecordingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
