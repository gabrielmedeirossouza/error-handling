type Error = Uppercase<string>;

type ResultOk<T> = {
  ok: true;
  value: T;
}

type ResultFail = {
  ok: false;
  error: Uppercase<string>;
}

type LogType = "info" | "error" | "warn"

export type TResult<T> = ResultOk<T> | ResultFail

export class Result {
  public static Log(type: LogType, msg: string) {
    console[type](msg)

    return {
      Ok: this.Ok,
      Fail: this._Fail
    }
  }

  public static Ok<T>(value: T): ResultOk<T> {
    return {
      ok: true,
      value
    }
  }

  private static _Fail(error: Error): ResultFail {
    return {
      ok: false,
      error
    }
  }
}

// ---- test ----

function getDay(date: string): TResult<number> {
  const possibleDate = new Date(date);

  if (!possibleDate.getDate()) {
    return Result.Log("error", `Invalid date: ${date}`).Fail("INVALID_DATE")
  }

  return Result.Ok(Number(possibleDate.getDay()))
}

getDay("2022-10-01")
getDay("2022-10-01fd")
