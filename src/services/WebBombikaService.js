export class WebBombikaService {
  getPlayerByUsername = async (username) => {
    const response = await fetch(`/api/v1/player-scores/${username}`, {
      method: "GET",
      headers: {
        gameId: "bombika",
      },
    });

    if (response.ok) {
      const resp = await response.json();
      return resp;
    } else {
      if (response.status === 404) {
        return undefined;
      } else {
        throw new Error(response.statusText);
      }
    }
  };

  saveScore = async (username, score) => {
    const response = await fetch("/api/v1/player-scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        gameId: "bombika",
      },
      body: JSON.stringify({
        username: username,
        score: score,
      }),
    });

    if (response.ok) {
      const resp = await response.json();
      return resp.id;
    } else {
      if (
        response.status === 400 ||
        response.status === 406 ||
        response.status === 409
      ) {
        const resp = await response.json();
        throw new Error(resp.detail);
      } else {
        throw new Error(response.statusText);
      }
    }
  };

  addScore = async (username, score) => {
    const response = await fetch(
      `/api/v1/player-scores/${username}/add-score`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          gameId: "bombika",
        },
        body: score,
      }
    );

    if (!response.ok) {
      if (response.status === 404 || response.status === 406) {
        const resp = await response.json();
        throw new Error(resp.detail);
      } else {
        throw new Error(response.statusText);
      }
    }
  };

  getTopPlayers = async () => {
    const response = await fetch("/api/v1/top-score", {
      headers: {
        gameId: "bombika",
      },
    });

    if (response.ok) {
      const resp = await response.json();
      return resp;
    } else {
      if (response.status === 400) {
        const resp = await response.json();
        throw Error(resp.detail);
      } else {
        throw Error(response.statusText);
      }
    }
  };

  deletePlayer = async (uid) => {
    const response = await fetch(`/api/v1/player-scores/${uid}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      if (response.status === 400) {
        const resp = await response.json();
        throw new Error(resp.detail);
      } else {
        throw new Error(response.statusText);
      }
    }
  };
}
