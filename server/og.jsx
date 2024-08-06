import satori from "satori";
import fs from "node:fs/promises";
import path from "path";
import React from "react";

export async function getOg({
  title = "Welcome to my blog",
  description = "A place where i share my thoughts",
}) {
  const fontPath = path.join(process.cwd(), "server", "Montserrat-Regular.ttf");
  const fontBuffer = await fs.readFile(fontPath);

  const svg = await satori(
       <div style={{
      color: '#000',
      backgroundColor: '#fff',
      display: 'flex',
      padding: 32,
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        gap: 16,
        padding: 30,
        border: '14px solid #ff356f',
        borderRadius: 30,
        margin: 'auto'
      }}>
     
        <p style={{
          fontSize: 32,
          color: '#000',
          fontWeight: 'bold',
          maxWidth: '80%',
          fontFamily: 'Montserrat',
        }}>
          {title}
        </p>
        <p style={{
          fontSize: 32,
          color: '#000',
          textAlign: 'left',
          maxWidth: '80%',
        }}>
          {description}
        </p>
      </div>
    </div>, 
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Montserrat",
          data: fontBuffer,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );

  return svg;
}

export async function getBlogPostOg({ title, author, date }) {
  const fontPath = path.join(process.cwd(), "server", "Montserrat-Regular.ttf");
  const fontPathBold = path.join(process.cwd(), "server", "Montserrat-Bold.ttf");
  const fontBufferNormal = await fs.readFile(fontPath);
  const fontBufferBold = await fs.readFile(fontPathBold);

  const svg = await satori(
 <div style={{
      color: '#000',
      backgroundColor: '#fff',
      display: 'flex',
      padding: 32,
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        gap: 16,
        padding: 30,
        border: '14px solid #ff356f',
        borderRadius: 30,
        margin: 'auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <img src="https://avatar.iran.liara.run/public" style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
          }} />
          <p style={{ fontSize: 24, fontWeight: 'semi-bold', color: '#000', marginLeft: 16 }}>
            {author}
          </p>
        </div>
        {/* <p style={{
          fontSize: 64,
          fontWeight: 'bold',
          color: '#000',
          marginBottom: 16,
        }}>{title}</p> */}
        <p style={{
          fontSize: 32,
          color: '#000',
          fontWeight: 'bold',
          maxWidth: '80%',
        }}>
          {title}
        </p>
        <p style={{
          fontSize: 32,
          color: '#000',
          textAlign: 'left',
          maxWidth: '80%',
        }}>
          {date}
        </p>
      </div>
    </div>
    
   ,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Montserrat",
          data: fontBufferNormal,
          weight: 400,
          style: "normal",
        },
        {
          name: "Montserrat",
          data: fontBufferBold,
          weight: 600,
          style: "bold",
        }
      ],
    }
  );

  return svg;
}
