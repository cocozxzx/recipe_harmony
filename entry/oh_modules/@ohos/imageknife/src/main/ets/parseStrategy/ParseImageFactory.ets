/*
 * Copyright (C) 2025 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// 解码策略工厂
import { RequestJobRequest } from "../model/ImageKnifeData";
import { GIFParseImage } from "./GIFParseImage";
import { IParseImage } from "./IParseImage";
import { ParseImageAnimator } from "./ParseImageAnimator";
import { ParseStaticImage } from "./ParseStaticImage";
import { SvgParseImage } from "./SvgParseImage";

export class ParseImageFactory {
  static getParseStrategy(request: RequestJobRequest, typeValue: string): IParseImage {
    if (request.isAnimator) {
      return new ParseImageAnimator()
    }

    if (typeValue === 'gif' || typeValue === 'webp') {
      return new GIFParseImage()
    } else if (typeValue === 'svg') {
      return new SvgParseImage()
    }

    return new ParseStaticImage()
  }
}