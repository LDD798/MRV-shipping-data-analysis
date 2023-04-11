import pandas as pd

def only_keep_floats_in_df(df: pd.DataFrame, col_name: str) -> pd.DataFrame:
    
    if (col_name not in df.columns):
        raise Exception("Non existant column")
    copy_df = df.copy()
    return copy_df[copy_df[col_name].apply(lambda x: isinstance(x, float))]


def is_float(element) -> bool:
    if element is None: 
        return False
    try:
        float(element)
        return True
    except ValueError:
        return False