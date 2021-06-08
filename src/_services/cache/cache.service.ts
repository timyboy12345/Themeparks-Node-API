import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
  }

  public async get<T>(key: string): Promise<T> {
    return this.cacheManager.get<T>(key);
  }

  public async set<T>(key: string, value: any, options?: CachingConfig): Promise<any> {
    return this.cacheManager.set(key, value, options);
  }

  public async delete(key: string): Promise<any> {
    return this.cacheManager.del(key);
  }

  public async remember<T>(key: string, callback: any, options?: CachingConfig): Promise<T> {
    const r = await this.get<T>(key);

    if (r) {
      return r;
    } else {
      const r = callback;
      return this.set(key, r, options).then(() => {
        return r;
      });
    }
  }
}
