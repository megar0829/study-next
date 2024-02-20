## Next js 정리

- Rendering Type
  - CSR (Client Side Rendering)
    - JavaScript 코드로 HTML 파일을 구성
    - Client 에서 페이지를 Rendering 하는 방식
    - 장점
      - 페이지 간 전환이 빠르다
    - 단점
      - HTML 요소를 검색하는 SEO 검색엔진에 노출이 되지 않는다.
      - 처음 페이지에 접근하였을 때 로딩 속도가 느리다.
      - 외부 API에 요청을 보낼 때 주소, ID 등 이 노출되어 보안에 취약하다.
  - SSR (Server Side Rendering)
    - HTML 요소로 HTML 파일을 구성
    - Server 에서 페이지를 Rendering 후 HTML 파일을 Client 요청에 응답
    - 장점
      - HTML 요소를 검색하는 SEO 검색엔진에 최적화
      - 페이지를 이동할 때마다 새롭게 Rendering 하기 때문에 처음 페이지에 접근하였을 때 로딩 속도가 빠르다.
      - 외부 API에서 Data Fetching 할 때 주소, ID 등이 노출되지 않아 안전하다.
    - 단점
      - 페이지를 계속해서 Rendering 하기 때문에 페이지 간 전환이 느리다.

- Rendering Components

  -  Server Component
     -  Next js 의 기본 component로 Back-end Server에서 Rendering 된 후 Client에서 아무런 동작도 일어나지 않는다.
     -  JavaScript 동작 X

  -  Client Component
     -  Back-end Server에서 Rendering 된 후 Client에서 JavaScript 코드가 Hydration 되어 Dynamic Component 로 만들어준다.
     -  JavaScript 동작 O
     -  사용 방법
        -  Page File 최상단에 `"use client";` 작성

- Next folder Structer

  - app
    - Rendering 되는 파일들이 위치하는 곳으로 page 라는 이름의 파일이 있다면 해당 파일이 Rendering 된다.
    - 1개의 폴더에는 각각 1개의 page, layout, not-found, loading 파일이 존재할 수 있다.
    - 폴더를 생성하면 app Routing이 자동으로 적용되며 폴더의 이름이 해당 페이지의 Url 이 된다.
  - components
  - assets

-  Next Special File Name

  - layout
    - 페이지의 뼈대가 되는 기본 구조를 작성하는 파일
    - 여러 개의 폴더 안에서는 중첩될 수 있다.
  - page
    - Next에서 실제로 Rendering 되는 File
  - not-found
    - Route된 주소가 현재 서버에 존재하지 않는 URL일때 보여줄 페이지를 정의
  - loading
    - Route된 주소의 페이지에서 data가 Load 되기 전까지 보여줄 페이지를 정의

- MetaData

  - HTML head에 적용되는 데이터를 정의

    - (title, description, icon .... 등)

  - Root Directory에서부터 중복되는 MetaData가 있다면 병합됨

  - URL 별로 다른 데이터를 보여주고 싶다면 Root Page에 기본 값과 표현식 선언

    ```react
    export const metadata :Metadata = {
      title: {
        template: "%s | Next Movies",
        default: "Loading..."
      },
      description: 'The best movies on th best framework.',
    };
    ```

- Route

  - Components/navigation.tsx
  -  Link 태그를 이용하여 Navigation Link를 선언
  - Routing Path를 확인하려면 React Hooks를 사용하여 확인할 수 있으며 JavaScript 코드가 반영되어야 하므로 Client Component로 전환

  ```react
  "use client";
  
  import Link from "next/link";
  import { usePathname } from "next/navigation";
  import { useState } from "react";
  
  export default function Navigation() {
    const path = usePathname();
  
    const [count, setCount] = useState(0);
  
    console.log(path);
    return (
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link> {path === "/" ? "👏" : ""}
          </li>
          <li>
            <Link href="/about-us">About Us</Link> {path === "/about-us" ? "👏" : ""}
          </li>
          <li>
            <button onClick={() => setCount(c => c + 1)}>{count}</button>
          </li>
        </ul>
      </nav>
    );
  }
  ```

  - Static Routing

    - Link 태그를 이용하여 app Directory 구조에 맞게 Next 내부에서 동작

  - Dynamic Routing

    - Group

      - Root Directory(app) 안에 그냥 문자열이 아닌 소괄호()를 사용하여 문자열을 작성하면 해당 문자열로 그룹화 하여 폴더 구조를 나눌 수 있다.
        - 실제 app route 에는 적용 X

    - Parameters

      - Dynamic Params를 적용하고 싶으면 해당 Directory 안에 대괄호[]를 이용하여 parameter의 이름을 정의하고 [parameter]/page 를 생성하면 해당 page 파일에서 props의 형태로 params를 적용할 수 있다.

        ```react
        export default function MovieDetail({
          params: {id},
        }: {
          params: {id: string}
        }) {
        
          return <h1>Movie {id}</h1>;
        }
        ```

- Data Fetch

  - 병렬 Fetch
    - `Promise.all`
      - 여러 Data Fetch를 동시에 처리할 때 동시에 요청을 보내기 위해서 사용
      - 요청을 보낸 모든 데이터가 응답될 때 까지 기다려야 한다는 단점이 있다.
    - `Suspense`
      - `Promise.all` 의 단점을 보완해서 각각의 Data Fetch 가 끝나면 바로 사용자에게 보이도록 한다.
      - Data Fetch 함수를 각각의 Component로 분리하고 해당 Component를 React `Suspense` Tag로 감싸는 형태

- Control Error

  - `error.tsx`
    - 각 page에서 Error가 발생했을 때 사용자가 다른 페이지로 이동할 수 있도록 화면에 Error 경고문 대신 보여줄 컴포넌트
    - 각 page에 따라 생성하여 같은 Directory에 위치해야 한다.
